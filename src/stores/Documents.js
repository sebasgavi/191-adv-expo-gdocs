import { observable, action, computed } from 'mobx';

export class Documents {

    constructor(){
    }

    @observable list = [
        {
            id: 1,
            name: 'Document mobx'
        }
    ];

}