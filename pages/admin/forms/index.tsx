import { Box, Container, Paper } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import PageContent from "../../../components/elements/PageContent";
import AppFormList from "../../../components/pages/forms/FormList";

export default function Applications(){
    return (
        <PageContent admin={true} title="Admin - Forms">
            <Container size={'md'}>
                <Box mt={30}>
                    <Paper withBorder>
                        <AppFormList/>
                    </Paper>
                </Box>
            </Container>
        </PageContent>
    )
}

export const getStaticProps = async ({ locale }: { locale: any }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})