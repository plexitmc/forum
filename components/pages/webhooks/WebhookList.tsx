import { Box, Button, Sx, Table, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";
import getWebhooks from "../../api/webhooks/getWebhooks";
import Error from "../../elements/Error";
import Loading from "../../elements/Loading";
import Webhook from "../../types/webhook";
import CreateWebhookModal from "./CreateWebhookModal";
import WebhookInfoModal from "./WebhookInfoModal";

export default function WebhookList() {

    const { isLoading, isError, data } = useQuery('webhooks', getWebhooks)
    const [isVisible, setVisible] = useState('');
    const [webhook, setWebhook] = useState<Webhook | undefined>();

    return (
        <>
            {(isLoading || !data) ? (isError ? <Error/> : <Loading/>) : 
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table highlightOnHover verticalSpacing={'md'} horizontalSpacing='xl'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Event</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isError ? <tr><td colSpan={3}><Error height={'25vh'}/></td></tr> : (isLoading || !data.webhooks ? <></> : 
                            data.webhooks.map(webhook => (
                                <Box component="tr" key={webhook._id} onClick={() => {
                                    setWebhook(webhook);
                                    setVisible('view');
                                }} sx={{ cursor: 'pointer' }}>
                                    <td>{webhook.name}</td>
                                    <td>{webhook.event}</td>
                                    <Box component='td'>
                                        <Tooltip withArrow label={dayjs(webhook.createdAt).format('DD/MM/YYYY, HH:mm')} transition='fade' transitionDuration={200}>
                                            {/* @ts-ignore */}
                                            {`${dayjs(webhook.createdAt).fromNow(true)} ago`}
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )))
                        }
                    </tbody>
                </Table>
                <Box sx={{ margin: '1rem'}}>
                    <Button variant="outline" radius='xl' onClick={() => setVisible('create')} leftIcon={<FaPlus/>}>Create webhook</Button>
                </Box>
            </Box>
            }
            <CreateWebhookModal isVisible={isVisible == 'create'} setVisible={setVisible} />
            <WebhookInfoModal webhook={webhook} isVisible={isVisible == 'view'} setVisible={setVisible} />
        </>
    )
}