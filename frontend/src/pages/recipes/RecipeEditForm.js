import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { useDropzone } from 'react-dropzone';

import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import Asset from "../../components/Asset";
import Upload from "../../assets/img/upload.png";
import { showError, showSuccess, showWarning } from '../../utils/ToastManager';


function RecipeEditForm() {
    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recipeRes, tagsRes] = await Promise.all([
                    axiosReq.get(`/recipes/${id}/`),
                    axios.get("/tags")
                ]);
                const {
                    title, description, image, ingredients, preparation_time,
                    cooking_time, servings, instructions, tags
                } = recipeRes.data;

                setAvailableTags(tagsRes.data.results);
                setSelectedTags(tags);
                setRecipeData({
                    title, description, ingredients, preparation_time,
                    cooking_time, servings, instructions, image
                });
                setImagePreview(image);
            } catch (err) {
                showError("Error fetching data:", err.message);
            }
        };

        fetchData();
    }, [id, history]);



    const { title, description, ingredients, instructions, preparation_time, cooking_time, servings } = recipeData;

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        showSuccess("Image ready for upload.");
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
        maxSize: 4 * 1024 * 1024,
        maxFiles: 1
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === "text") {
            if (name === "title" && value.length > 40) return;
            if (name === "description" && value.length > 1000) return;
            if (name === "ingredients" && value.length > 2000) return;
            if (name === "instructions" && value.length > 3000) return;
        } else if (type === "number") {
            if (value === "") {
                setRecipeData({
                    ...recipeData,
                    [name]: value,
                });
                return;
            }
            const numValue = Number(value);
            if ((name === "preparation_time" || name === "cooking_time") && (numValue < 1 || numValue > 999)) return;
            if (name === "servings" && (numValue < 1 || numValue > 50)) return;
        }
        setRecipeData({
            ...recipeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleToggleTag = (tagId) => {
        setSelectedTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]);
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
        selectedTags.forEach(tag => formData.append("tags", tag));
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await axiosReq.put(`/recipes/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            history.push(`/recipes/${id}`);
            showSuccess("Recipe updated successfully.");
        } catch (err) {
            showError("Failed to update recipe: " + err.message);
            setErrors(err.response?.data);

        }
    };

    const handleDelete = async () => {
        try {
            await axiosReq.delete(`/recipes/${id}/`);
            history.push("/");
            showSuccess("Recipe deleted successfully.");
            handleClose();
        } catch (err) {
            showError("Failed to delete the recipe: " + err.message);
            setErrors(err.response?.data);
            handleClose();
        }
    };

    const renderTags = () => {
        return availableTags.map(tag => (
            <Button
                key={tag.id}
                onClick={() => handleToggleTag(tag.id)}
                variant={selectedTags.includes(tag.id) ? "warning" : "secondary"}
                className={`m-1 ${btnStyles.TagButton}`}>
                {tag.name}
            </Button>
        ));
    };

    // Function to remove the added photo
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        showWarning("Image Removed")
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col className="py-2 p-0 p-md-2" md={12}>
                    <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
                        <Form.Group className="text-center">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                {imagePreview ? (
                                    <>
                                        <FormLabel>Click on the photo or drop another photo here to change the photo<br></br>
                                            <Image src={imagePreview} alt="Preview" rounded className={appStyles.Image} />
                                        </FormLabel>
                                        <Button className="mt-3" onClick={removeImage}>Remove Image</Button>
                                    </>
                                ) : (
                                    <Asset src={Upload} message="Drag and drop a photo here, or click to select a photo" />
                                )}
                            </div>
                            {errors?.image?.map((message, idx) => <Alert variant="warning" key={idx}>{message}</Alert>)}
                        </Form.Group>
                    </Container>
                    <Container className={appStyles.Content}>
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
                        <Row>
                            <div>
                                <Button variant="danger" className={` ml-3`} onClick={() => history.goBack()}>
                                    Cancel
                                </Button>
                                <Button className={`${btnStyles.Button} ${btnStyles.Yellow} ml-3`} type="submit">
                                    Save
                                </Button>
                            </div>
                            <Button
                                variant="danger"
                                className={` ${btnStyles.Delete}`}
                                onClick={handleShow}
                            >
                                Delete
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Deletion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete this recipe? This action cannot be undone.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete Recipe
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    </Container>
                </Col>
            </Container>
        </Form>
    );
}

export default RecipeEditForm;
