import React, { useState } from 'react'
import { TailFileSelector, TailModal, TailMultiInput, TailTextArea } from '../index';
import { Check } from '@phosphor-icons/react';
import { AddingPostData } from '../../types';
import { secureGraphQLQuery, uploadImage, validateForm } from '../../utils';
import { rules } from './rules';
import { toast } from 'react-toastify';
import Cookies from "universal-cookie";
import { ADD_POST } from '../../graphQl';
import { useMutation } from '@apollo/client';
const cookies = new Cookies();

interface Fprops {
    showAddPostModal: boolean;
    handleCloseModal: () => void;
}

const PostForm: React.FC<Fprops> = ({ handleCloseModal, showAddPostModal }) => {
    const [uploadPostQuery] = useMutation(ADD_POST);
    const [fetchPostUpload, setFetchPostUpload] = useState<boolean>(false);
    const [addPostContent, setAddPostContent] = useState<AddingPostData>({
        caption: '',
        image: null,
        mention: [],
        tags: []
    });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name: string = event.target.name;
        let value: string = event.target.value;
        setErrorMessages({});

        // Check if the name is 'image' and if files are selected
        if (
            name === "image" &&
            event.target.files &&
            event.target.files?.[0]
        ) {
            // Update the 'profile_pic' in the state with the selected file
            setAddPostContent((prev) => ({
                ...prev,
                [name]: event.target.files?.[0], // Set the selected file
            }));
        } else {
            // For other inputs, update the state with the string value
            setAddPostContent((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    /* Handle form submission for post creation. */
    const handlePostCreation = async () => {
        // Validate form data based on predefined rules
        const errors = validateForm(addPostContent, rules);
        setErrorMessages(errors);

        // Stop the process if there are validation errors
        if (Object.keys(errors).length > 0) {
            return;
        }

        setFetchPostUpload(true);
        const uid = cookies.get("i06");

        const { caption, image, mention, tags } = addPostContent;

        try {
            // Upload image to Supabase Storage
            let imagePath: string | null = '';
            if (image !== null) {
                imagePath = await uploadImage(image)
                if (!imagePath) {
                    toast.error("Image upload failed. Please try again.");
                    setFetchPostUpload(false);
                    return;
                }
            }

            // Save post to Supabase using GraphQL mutation
            await secureGraphQLQuery(uploadPostQuery, {
                author_id: uid,
                caption,
                image_url: imagePath,
                mention,
                tags,
            });
            toast.success("Post Uploaded.");
            setFetchPostUpload(false);
            handleCloseModal();
            // reset state to clean inputs so that when user open modal dont get previous filled data.
            setAddPostContent({
                caption: '',
                image: null,
                mention: [],
                tags: []
            })
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("Unable to upload.");
            setFetchPostUpload(false);
        }
    };

    return (
        <>
            <TailModal
                title="Add a post."
                loading={fetchPostUpload}
                open={showAddPostModal}
                onClose={() => {
                    handleCloseModal();
                    setAddPostContent({
                        caption: '',
                        image: null,
                        mention: [],
                        tags: []
                    });
                }}
                onClick={handlePostCreation}
                confirmLable='Add'
                buttonIcon={<Check weight='bold' />}
                body={
                    <div className='px-4'>
                        {/* Caption */}
                        <TailTextArea
                            name="description"
                            lable="Caption"
                            placeholder="Write something intresting ..."
                            value={addPostContent.caption}
                            onChange={(e) => {
                                setErrorMessages({})
                                setAddPostContent((prev) => ({
                                    ...prev,
                                    caption: e.target.value,
                                }));
                            }}
                            rows={2}
                            error={errorMessages.caption}
                        />
                        {/* Post image */}
                        <TailFileSelector
                            require={true}
                            name="image"
                            placeholder="Add Picture (Optional)"
                            value={addPostContent.image || null}
                            onChange={onChangeHandler}
                            error={errorMessages.image}
                        />
                        {/* tags */}
                        <TailMultiInput
                            name='tags'
                            labelText='Add tags (Optional)'
                            type="tags"
                            placeholder="Type and press Enter to add tags"
                            // onUpdate={(items) => setTags(items)}
                            onUpdate={(items) => {
                                setAddPostContent((prev) => ({
                                    ...prev,
                                    tags: items,
                                }));
                            }}
                        />
                        {/* mention users */}
                        <TailMultiInput
                            name='mentions'
                            labelText='Mention User (Optional)'
                            type="mentions"
                            placeholder="Type and press Enter to add mentions"
                            // onUpdate={(items) => setMentions(items)}
                            onUpdate={(items) => {
                                setAddPostContent((prev) => ({
                                    ...prev,
                                    mention: items,
                                }));
                            }}
                        />
                    </div>
                }
            />
        </>
    )
}

export default PostForm