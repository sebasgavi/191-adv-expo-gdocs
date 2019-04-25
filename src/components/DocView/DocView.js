import React from 'react';
import { Text, Image, View, Button } from 'react-native';

export default class DocView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
        };
        this.addText = this.addText.bind(this);
        this.addImage = this.addImage.bind(this);
    }

    addText(){
        this.setState((prevState) => {
            return {
                blocks: [ ...prevState.blocks, {
                    id: prevState.blocks.length,
                    type: 'text',
                    text: 'hola ' + Math.random()
                } ]
            }
        });
    }

    addImage(){
        this.setState((prevState) => {
            return {
                blocks: [ ...prevState.blocks, {
                    id: prevState.blocks.length,
                    type: 'img',
                    url: 'https://fotografias.lasexta.com/clipping/cmsimages01/2017/02/07/364CAAAC-A60E-43BB-8FED-05AA0B8F3AF9/58.jpg'
                } ]
            }
        });
    }

    render(){
        let { id } = this.props.match.params;
        return (
            <View>
                <Text>Doc View {id}</Text>
    
                {this.state.blocks && this.state.blocks.map((block) => {
                    if(block.type === 'text'){
                        return <Text key={block.id}>{block.text}</Text>
                    } else {
                        return <Image key={block.id} style={{ height: 50 }} source={{ uri: block.url }} />
                    }
                })}

                <View>
                    <Button onPress={this.addText} title="Add Text" />
                    <Button onPress={this.addImage} title="Add Image"/>
                </View>
            </View>
        );
    }
}