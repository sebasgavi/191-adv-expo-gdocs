import { observable, action, computed } from 'mobx';

export class Documents {

    constructor(){
    }

    @observable selected = null;

    @observable list = [
        {
            id: 1,
            name: 'Document mobx',
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'Lorem ipsum lo que sea'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://static2.lasprovincias.es/www/multimedia/201706/25/media/cortadas/gato-kngE-U4015529328506D-624x385@Las%20Provincias.jpg'
                }
            ],
        }
    ];

    @action addText(newText){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'text',
            text: newText
        });
    }

    @action addImage(newImage, height){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'img',
            url: newImage,
            height
        });
    }

    @action setSelectedById(id){
        let doc = this.list.find(doc => doc.id === parseInt(id));
        this.selected = doc;
    }

}