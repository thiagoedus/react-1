import P from 'prop-types';
import './styles.css';

export const PostCard = ({id, title, cover, body}) => {


    return(
        <div className='post'>
            <img src={cover} alt = {title}/>
            <div key={id} className="post-content">
                <h2>{title} {id}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    id: P.number.isRequired,
    title: P.string.isRequired,
    cover: P.string.isRequired,
    body: P.string.isRequired,
}
