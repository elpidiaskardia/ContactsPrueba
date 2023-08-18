<template>

    <div>
        <b-overlay :show="loading" rounded="sm">

            <b-row>
                <b-col>
                    <button @click="downloadContacts" class="btn btn-primary">Download</button>
                </b-col>
            </b-row>
            <br />

            <b-row>
                <b-col>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <b-table head-variant="light" :items="contactsData" :current-page="paginationAndFilter.pageIndex"
                                 :per-page="paginationAndFilter.pageSize"
                                 stacked="md"
                                 sort-icon-left
                                 show-empty striped bordered></b-table>
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
        </b-overlay>

    </div>
</template>

<script>
    import { HTTP } from '@/core/http-services';

    export default {
        components: {},

        data() {
            return {
                contactsData: [],
                loading: false,
                paginationAndFilter: {
                    pageIndex: 1,
                    pageSize: 20,
                    pageTotals: 1,
                    all: 0,
                },
            };
        },

        methods: {

            async downloadContacts() {
                this.loading = true;
                 HTTP.get('items')
                        .then(response => {
                            this.loading = false;
                            this.contactsData = response.data.items;
                            this.paginationAndFilter.pageTotals = this.contactsData.length;

                        }
                 ).catch(e => {
                     this.loading = false;
                     this.$bvToast.toast(e.response.data.errors[0].errorMessage, { variant: 'danger', title: 'Error' });
                 })
            },

        },

    };
</script>
