import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, Button, Col, Container, Alert, Image, FormLabel } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';

import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import axios from "axios";
import Asset from "../../components/Asset";
import Upload from "../../assets/img/upload.png";

function RecipeCreateForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);


    useEffect(() => {
        axios.get("/tags")
            .then(response => setAvailableTags(response.data.results))
            .catch(error => console.error("Error fetching tags:", error));
    }, []);

    const handleToggleTag = tagId => {
        setSelectedTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : (prev.length < 3 ? [...prev, tagId] : prev));
    };

    const renderTags = () => {
        return availableTags.map(tag => (
            <Button
                key={tag.id}
                onClick={() => handleToggleTag(tag.id)}
                variant={selectedTags.includes(tag.id) ? "info" : "secondary"}
                className={`m-1 ${btnStyles.TagButton}`}>
                {tag.name}
            </Button>
        ));
    };

    const [recipeData, setRecipeData] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        preparation_time: "",
        cooking_time: "",
        servings: "",
        image: null,
        tags: [],
    });
    const { title, description, ingredients, instructions, preparation_time, cooking_time, servings, image } = recipeData;

    const history = useHistory();

    //https://react-dropzone.js.org/
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/bmp': ['.bmp'],
            'image/tiff': ['.tiff', '.tif'],
            'image/x-icon': ['.ico'],
            'image/svg+xml': ['.svg'],
            'image/webp': ['.webp']
        },
        maxSize: 10 * 1024 * 1024,
        maxFiles: 1
    });

    const handleChange = (event) => {
        setRecipeData({
            ...recipeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("ingredients", ingredients);
        formData.append("instructions", instructions);
        formData.append("preparation_time", preparation_time);
        formData.append("cooking_time", cooking_time);
        formData.append("servings", servings);
        if (imageFile) formData.append("image", imageFile);
        selectedTags.forEach(tag => {
            formData.append("tags", tag);
        });
        try {
            const { data } = await axiosReq.post("/recipes/", formData);
            history.push(`/recipes/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };



    const recipeFields = (
        <div className={styles.RecipeFields}>
            <Form.Group>
                <Form.Label><strong>Title</strong></Form.Label>
                <Form.Control type="text" name="title" placeholder="What do you call your recipe?" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label><strong>Description</strong></Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={description} placeholder="Shortly describe your recipe" onChange={handleChange} />
            </Form.Group>
            {errors?.description?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label><strong>Ingredients</strong></Form.Label>
                <Form.Control as="textarea" rows={3} name="ingredients" placeholder="List your ingredients and their quantities" value={ingredients} onChange={handleChange} />
            </Form.Group>
            {errors?.ingredients?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label><strong>Instructions</strong></Form.Label>
                <Form.Control as="textarea" rows={6} name="instructions" placeholder="How do you cook your recipe?" value={instructions} onChange={handleChange} />
            </Form.Group>
            {errors?.instructions?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label><strong>Preparation Time <i className="fa-solid fa-clock fa-lg"></i>(minutes)</strong></Form.Label>
                <Form.Control type="number" name="preparation_time" value={preparation_time} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label><strong>Cooking Time <i className="fa-solid fa-clock fa-lg"></i> (minutes)</strong></Form.Label>
                <Form.Control type="number" name="cooking_time" value={cooking_time} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label><strong>Servings</strong></Form.Label>
                <Form.Control type="number" name="servings" value={servings} onChange={handleChange} placeholder="Number of servings" />
            </Form.Group>
            <Form.Group>
                <Form.Label><strong>Tags</strong> (Select up to 3 tags for categorisation of your recipe)</Form.Label>
                <div>{renderTags()}</div>
            </Form.Group>
            <Button className={`${btnStyles.Button} ${btnStyles.Large} ${btnStyles.Red}`} onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Yellow} ${btnStyles.Large} ml-3`} type="submit">
                Create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>

            <Col className="py-2 p-0 p-md-2" md={12}>
                <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center mb-2`}>
                    <Form.Group className="text-center">

                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            {imagePreview ? (
                                <FormLabel>Click on the photo or drop another photo here to change the photo<br></br>
                                    <Image src={imagePreview} alt="Preview" rounded className={appStyles.Image} />
                                </FormLabel>
                            ) : (
                                <Asset src={Upload} message="Drag and drop a photo here, or click to select a photo" />
                            )}
                        </div>
                        {errors?.image?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}
                    </Form.Group>
                </Container>
                <Container className={appStyles.Content}>
                    {recipeFields}
                </Container>
            </Col>


        </Form>
    );
}

export default RecipeCreateForm;
