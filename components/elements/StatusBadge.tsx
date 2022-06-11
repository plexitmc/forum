import { Badge } from "@mantine/core";

export default function StatusBadge({ status }: { status?: string }){

    switch(status) {
        case 'accepted':
            return <Badge color="green">Accepted</Badge>
        case 'rejected':
            return <Badge color="red">Rejected</Badge>
        case 'pending':
        default:
            return <Badge color="orange">Pending</Badge>
    }
}