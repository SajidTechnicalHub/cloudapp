import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        position:'relative'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    pageNumber: {
        position:'absolute',
        fontSize:'12px',
        bottom:30,
        left:0,
        right:0,
        textAlign:'center',
        color:'grey'
    }
});


const PdfReport = (props) => {
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Report Name: {props.abc}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
            </Document>
        </>
    )
}

export default PdfReport