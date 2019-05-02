import { observable, action, computed } from 'mobx';

export class Documents {

    @observable list = [
        {
            id: 1,
            name: 'Document mobx'
        }
    ];

}