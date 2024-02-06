import axios  from "axios";

let API_URL = 'http://localhost:8080/api/vehiculos';

export const PostAutos = async (values) => {
    const formData = {
        brand: values.brand,
        model: values.model,
        serie: values.serie,
        year: values.year,
    }
    console.log(formData)
    try {
        const response = await axios.post(API_URL,formData);
        console.log(response)
        return response.request.status

    } catch (error) {
        throw error;
    }
}

export const GetAutos = async (page, size, sort) => {
    const params = {
        page,
        size, sort
    };
    try {
        const response = await axios.post(API_URL+"/page", { params });

        return response.data;
    } catch (error) {
        throw error;
    }
}
