import {
  Form, Input, TextArea, Button, Image, Message, Header,
  Icon
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

const INITIAL_PRODUCT = {
  name:"",
  price:"",
  media:"",
  description:""
}

import React from 'react';

function CreateProduct() {
  const [product, setProduct] = React.useState({INITIAL_PRODUCT});
  const [success,setSuccess] = React.useState(false);
  const [mediaPreview,setMediaPreview] = React.useState('');
  const [loading,setLoading] = React.useState(false);
  const [disabled,setDisabled] = React.useState(true);

  React.useEffect(()=>{
    const isProduct = Object.values(product).every(el=>Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  },[product])

  function handleChange(e) {
    const { name, value,files } = e.target
    if(name==='media'){
      setProduct(prevState=>({...prevState,media:files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    }
    else{
      setProduct((prevState)=>({...prevState, [name]: value }));
    }
  }

  async function handleImageUpload(){
    const data = new FormData();
    data.append('file',product.media);
    data.append('upload_preset','reactshop');
    data.append('cloud_name','dblmpu0fs');
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaUrl = response.data.url
    return mediaUrl;
  }

  async function handleSubmit(e){
    try {
      e.preventDefault();
      setLoading(true);
      const mediaUrl = await handleImageUpload();
      console.log({mediaUrl})
      const url = `${baseUrl}/api/product`
      const {name,price,description} = product;
      const payload = {name,price,description,mediaUrl};
      const response = await axios.post(url,payload);
      console.log({response});
      setLoading(false);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message success icon="check" header="Sucecss" content="Your product has been posted" />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/> 
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />


        <Form.Field
          control={Button}
          color="blue"
          disabled={disabled || loading}
          icon="pencil alternate"
          content="Submit"
          type="Submit"
          onChange={handleChange}
        />
      </Form>
    </>
  );
}

export default CreateProduct;
