import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { Form, Button, Row, Col, Container, Alert, Image } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';

import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function RecipeCreateForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});
    const [recipeData, setRecipeData] = useState({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        preparation_time: "",
        cooking_time: "",
        servings: "",
        image: null,
    });
    const { title, description, ingredients, instructions, preparation_time, cooking_time, servings, image } = recipeData;

    const history = useHistory();

    //https://react-dropzone.js.org/
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; 
        if (file) {
           
            if (recipeData.image) {
                URL.revokeObjectURL(recipeData.image.preview);
            }
            setRecipeData({
                ...recipeData,
                image: Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
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
        if (image) {
            formData.append('image', image);
        }

        try {
            const { data } = await axiosReq.post("/recipes/", formData);
            history.push(`/recipes/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

   const imagePreview = recipeData.image && (
        <Image src={recipeData.image.preview} alt="Recipe preview" rounded className={appStyles.Image} />
    );

    const recipeFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={description} onChange={handleChange} />
            </Form.Group>
            {errors?.description?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control as="textarea" rows={3} name="ingredients" value={ingredients} onChange={handleChange} />
            </Form.Group>
            {errors?.ingredients?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label>Instructions</Form.Label>
                <Form.Control as="textarea" rows={6} name="instructions" value={instructions} onChange={handleChange} />
            </Form.Group>
            {errors?.instructions?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}

            <Form.Group>
                <Form.Label>Preparation Time (minutes)</Form.Label>
                <Form.Control type="number" name="preparation_time" value={preparation_time} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Cooking Time (minutes)</Form.Label>
                <Form.Control type="number" name="cooking_time" value={cooking_time} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Servings</Form.Label>
                <Form.Control type="number" name="servings" value={servings} onChange={handleChange} />
            </Form.Group>

            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                Create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
                        <Form.Group className="text-center">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <Button className={`${btnStyles.Button} ${btnStyles.Blue}`}>Upload a photo</Button>
                                <div>or drag and drop</div>
                            </div>
                            {errors?.image?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}
                            {imagePreview}
                        </Form.Group>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block">
                    <Container className={appStyles.Content}>
                        {recipeFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeCreateForm;
