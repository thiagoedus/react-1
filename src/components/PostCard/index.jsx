import './styles.css'

export const PostCard = ({id, title, cover, body}) => {


    return(
        <div className='post'>
            <img src={cover} alt = {cover}/>
            <div key={id} className="post-content">
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}