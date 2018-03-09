import api from "../../services/httpService";
import moment from "moment/moment";
import store from "../../utils/storage";

export const getCompanies = async() => {
    let lastUpdate = await store.get('lastUpdatedCompanies');
    let nextUpdate = moment(lastUpdate).add(1,'days').format();
    let dateNow = moment.utc().format();
    if(nextUpdate <= dateNow){
        let requestCompanies = (new api()).setProps(this.props);

        await requestCompanies.companies('GET', false,false,
            async (response) => {
                let companies = {};
                response.data.forEach((item)=>{
                    companies[item.id] = item;
                });

                await this.set({companies:companies, read_from_server: false});
            },
            (error) => {
                this.props.dialogActions.dialogShow({ title:I18n.t("server_error"), message:error.message});
            }
        );
        await this.saveLastUpdateCompanies();
    }
};