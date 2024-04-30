import Avatar from '../../components/Avatar';

const Review = (props) => {
    const {
        profile_id,
        profile_image,
        user,
        updated_at,
        text,
        id,
        setPost,
        setComments,
      } = props;

    return (
        <div>
            <Avatar src={profile_image} alt={`${user} avatar`} height={40} />
            <p>{text}</p>
            
        </div>
    );
};

export default Review;