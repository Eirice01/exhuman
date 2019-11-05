import { observable , action } from 'mobx'

class DeleteStore {

    @observable deleteModal = false;
    @observable singleDelete = false;
    @observable singleDeleteId = null;
    @action showDeleteModal(val) {
        this.deleteModal = val;
    }
    @action setSingleDelete(val) {
        this.singleDelete = val;
    }
    @action setSingleDeleteId(val) {
        this.singleDeleteId = val;
    }
}
const deleteStore = new DeleteStore();
export default deleteStore;