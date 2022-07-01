import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts, handleEdit, editContent, setEditContent, editTitle, setEditTitle, setEditAttachment, editAttachment
}) => {
    const { uuid } = useParams();
    const post = posts.find(post => (post.uuid).toString() === uuid);
    console.log(post);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditContent(post.content);
            setEditAttachment(post.attachment);
        }
    }, [post, setEditTitle, setEditContent, setEditAttachment])

    return (
        <main className="container   h-100 m-6  ">
            
            { {editTitle , editContent} &&
            <>
                <h2>Edit Post</h2>
                <form className= " m-auto bd-highlight  row justify-content-center my-3 " onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">

                <div className="col-5">
                    <label className='form-label' htmlFor="editTitle">Title:</label>
                    <input
                        id="editTitle"
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-6">
                    <label className='form-label' htmlFor="atachment">Image:</label>
                    <input
                        id="attachment"
                        type="file"
                        name='attachment'
                        className="form-control"
                        onChange={(e) => setEditAttachment(e.target.files[0])}
                        
                        
                        
                    />
                </div>
                <div className="col-9">

                    <label  className='form-label' htmlFor="editContent">Post:</label>
                    <textarea
                        id="editContent"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                    
                    <button className='btn btn-primary mt-5'  onClick={() => handleEdit(post.uuid)}   type="submit">Submit</button>
                </form>
            </> 
            }
            {!editTitle && 
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
               
        </main>
  
    )
}

export default EditPost