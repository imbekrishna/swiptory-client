import { memo, useContext } from "react";
import styles from "./styles.module.css";
import { ModalContext } from "@contexts/ModalContext";
import editIcon from "@assets/edit.svg";
import { UserContext } from "@contexts/UserContext";

const Story = memo(({ story }) => {
  const featureSlide = story?.slides[0];

  const { user } = useContext(UserContext);
  const { toggleStoryModal, toggleAddModal } = useContext(ModalContext);

  const bgStyle = {
    background: `
      linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.09) 50%,
      rgba(0, 0, 0, 0.85) 75%
    ),
    url(${featureSlide.imageUrl}) center/cover no-repeat
    `,
  };
  return (
    <div
      className={styles.wrapper}
      style={bgStyle}
      onClick={() => toggleStoryModal(story._id)}
    >
      <div className={styles.detail}>
        <h3>{featureSlide.heading}</h3>
        <p>{featureSlide.description}</p>
      </div>
      {story.user === user.id && (
        <button
          className={styles.editBtn}
          onClick={(e) => {
            e.stopPropagation();
            toggleAddModal("EDIT", story);
          }}
        >
          <img src={editIcon} alt="" width="24px" /> <span>Edit</span>
        </button>
      )}
    </div>
  );
});
Story.displayName = "Story";
export default Story;
