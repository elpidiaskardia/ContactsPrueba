<template>
    <div>
        <b-overlay :show="loading" rounded="sm">

            <b-row>
                <b-col>
                    <input type="file" @change="handleFileUpload" class="mb-3 form-control " />
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3>Previews</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <b-table head-variant="light"
                                 :items="contactsData"
                                 :current-page="paginationAndFilter.pageIndex"
                                 :per-page="paginationAndFilter.pageSize"
                                 stacked="md"
                                 sort-icon-left
                                 show-empty striped bordered>
                        </b-table>
                    </div>
                    <br />

                    <div class="clearfix">
                        <div class="float-right">
                            <b-pagination v-model="paginationAndFilter.pageIndex"
                                          :total-rows="paginationAndFilter.pageTotals"
                                          :per-page="paginationAndFilter.pageSize"
                                          first-number
                                          last-number>
                            </b-pagination>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <button @click="uploadContacts" class="btn btn-primary">Upload Contacts</button>
                </b-col>
            </b-row>
        </b-overlay>

    </div>

</template>

<script>
    import Papa from 'papaparse';
    import { HTTP } from '@/core/http-services';

    export default {
        data() {
            return {
                contactsData: [],
                paginationAndFilter: {
                    pageIndex: 1,
                    pageSize: 20,
                    pageTotals: 1,
                    all: 0,
                },
                loading: false,

            };
        },
        methods: {
            handleFileUpload(event) {
                const file = event.target.files[0];
                this.parseCSV(file);
            },
            insertTable(e) {
                if (e.length != 1) {
                    if (e[1].length < 10) {
                        for (let index = e[1].length; index < 10; index++) {
                            e[1] = '0' + e[1];
                        }
                    }
                    this.contactsData.push({ name: e[0], phone: e[1].substring(0, 3) + '-' + e[1].substring(3, 6) + '-' + e[1].substring(6), email: e[2] });
                    this.paginationAndFilter.pageTotals = this.contactsData.length;

                }
            },
            parseCSV(file) {
                Papa.parse(file, {
                    complete: (results) => {
                        results.data.forEach(currentValue =>
                            this.insertTable(currentValue)
                        )
                    },
                });

            },
            async uploadContacts() {
                this.loading = true;
                var length = this.contactsData.length;
                var i = 0;
                while (i < length) {
                    try {
                        await HTTP.post('items', this.contactsData[i])
                            .then(response => {
                                i++;
                                console.log(response);
                            });
                    } catch (e) {
                        console.log(e);

                    }                 

                }
                this.loading = false;

                }

            },
       
    };
</script>
