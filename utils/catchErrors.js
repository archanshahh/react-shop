function catchErrors(error, displayError){
    let errorMsg;

    if(error.response){
        //error status code except 2xx
        errorMsg = error.response.data;
        console.error("Error response ", errorMsg);

        //For cloudinary image uploads
        if(error.response.data.error){
            errorMsg = error.response.data.error.message;
        }
    }
    else if(error.request){
        //no response received
        errorMsg = error.request
         console.error("Error request",errorMsg);
    }
    else{
        errorMsg = error.message;
        console.error("Error message",errorMsg);
    }

    displayError(errorMsg);

}

export default catchErrors;