import { observable, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';

export class Documents {

    constructor(db){
        this.db = db;

        this.readStorage();

        this.db.collection("documents")
            .where('owner', '==', '3uSLdOhkgJeccSVZlt4L')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    
                    let found = this.list.findIndex((docGuardado) => {
                        return doc.id === docGuardado.id;
                    });

                    let temp = {
                        ...doc.data(),
                        id: doc.id
                    };
                    //if(!temp.blocks) temp.blocks = [];

                    if(found < 0){
                        this.list.push(temp);
                    } else {
                        this.list.splice(found, 1);
                        temp.blocks.concat(this.list[found].blocks);
                        this.list.push(temp);
                    }
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
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

        this.updateStorage();
    }

    @action addImage(newImage, height){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'img',
            url: newImage,
            height
        });

        this.updateStorage();
    }

    async updateStorage(){

        let copy = { ...this.selected };
        delete copy.id;

        this.db.collection('documents')
            .doc(this.selected.id + '')
            .set(copy);

        try {
            await AsyncStorage.setItem('list', JSON.stringify(this.list));            
        } catch (e) {
            // saving error
        }
    }

    async readStorage(){
        try {
            const value = await AsyncStorage.getItem('list');
            if(value !== null) {
                let storageList = JSON.parse(value);
                if(storageList !== null) this.list = storageList;
            }
        } catch(e) {
            // error reading value
        }
    }

    @action setSelectedById(id){
        let doc = this.list.find(doc => doc.id == id);
        this.selected = doc;
        this.selected.blocks = this.selected.blocks || [];
    }

}