import { observable, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import * as firebase from "firebase/app";
import "firebase/firestore";

export class Documents {

    constructor(){
        this.readStorage();

        var firebaseConfig = {
            apiKey: "AIzaSyApqUPW4WvE5dCC0G7z8lpqhTndxK66aoM",
            authDomain: "adv-90ad2.firebaseapp.com",
            databaseURL: "https://adv-90ad2.firebaseio.com",
            projectId: "adv-90ad2",
            storageBucket: "adv-90ad2.appspot.com",
            messagingSenderId: "652073464161",
            appId: "1:652073464161:web:e25895ffe91aa783"
        };
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();

        this.db.collection("documents")
            .where('owner', '==', '3uSLdOhkgJeccSVZlt4L')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    let temp = {
                        ...doc.data(),
                        id: doc.id
                    };
                    this.list.push(temp);
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
        try {
            await AsyncStorage.setItem('list', JSON.stringify(this.list));
        } catch (e) {
            // saving error
        }
    }

    async readStorage(){
        try {
            const value = await AsyncStorage.getItem('list')
            if(value !== null) {
            let storageList = JSON.parse(value);
            if(storageList !== null) this.list = storageList;
            }
        } catch(e) {
            // error reading value
        }
    }

    @action setSelectedById(id){
        let doc = this.list.find(doc => doc.id === parseInt(id));
        this.selected = doc;
    }

}