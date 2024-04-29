import { useCallback, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import clsx from "clsx";
import toast from "react-hot-toast";

import Like from "./Like";
import Bookmark from "./Bookmark";
import styles from "./styles.module.css";

import closeIcon from "@assets/close.svg";
import nextIcon from "@assets/next.svg";
import prevIcon from "@assets/prev.svg";
import sendIcon from "@assets/send.svg";

import { ModalContext } from "@/contexts/ModalContext";
import useStory from "@/hooks/useStory";
import Spinner from "@components/Loading/Spinner";

const StoryModal = () => {
  const navigate = useNavigate();
  const params = useParams();

  const indexRef = useRef(0); // remember slides index
  const divRef = useRef(null);

  const { storyModal, toggleStoryModal } = useContext(ModalContext);

  let storyId = params.storyId || storyModal.activeStoryId;

  const { fetchStatus, likeStory, bookmarkStory, data } = useStory(storyId);

  const story = data.story;
  const liked = data.liked;
  const bookmarked = data.bookmarked;

  const [index, setIndex] = useState(indexRef.current);
  const [overflowHidden, setOverflowHidden] = useState(true);
  const isOverflowing = story?.slides[index].description.length > 111;

  const toPrev = () => {
    indexRef.current = indexRef.current > 0 ? indexRef.current - 1 : 0;
    setIndex(indexRef.current);
    return indexRef.current;
  };

  const toNext = useCallback(() => {
    indexRef.current =
      indexRef.current < story?.slides.length - 1
        ? indexRef.current + 1
        : indexRef.current;
    setIndex(indexRef.current);
    return indexRef.current;
  }, [indexRef, story]);

  const handleClick = (e) => {
    const divWidth = divRef.current.getBoundingClientRect().width;

    const halfWidth = divWidth / 2;
    const mousePosition = e.nativeEvent.offsetX;

    if (mousePosition < halfWidth) {
      toPrev();
    } else {
      toNext();
    }
    e.stopPropagation();
  };

  const copyShareLink = (e) => {
    e.stopPropagation();

    const protocol = window.location.protocol;
    const host = window.location.host;

    const url = `${protocol}//${host}/story/${storyId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const closeModal = (e) => {
    e.stopPropagation();
    indexRef.current = 0;
    setIndex(0);
    toggleStoryModal(null);
    if (params.storyId) {
      storyId = null;
      navigate("/");
    }
  };

  const bgStyle = {
    background: `
      linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 5%,
      rgba(0, 0, 0, 0.09) 50%,
      rgba(0, 0, 0, 0.85) 75%
    ),
    url(${story?.slides[indexRef.current].imageUrl}) center/cover no-repeat
    `,
  };

  if (!storyId) {
    return;
  }

  if (fetchStatus.loading) {
    return (
      <article className={styles.wrapper}>
        <Spinner />
      </article>
    );
  }

  return (
    <article
      // style={{ display: storyId || !storyModal.hidden ? "" : "none" }}
      className={styles.wrapper}
    >
      <img
        className={styles.navBtn}
        src={prevIcon}
        alt=""
        role="button"
        onClick={toPrev}
      />
      <div
        ref={divRef}
        className={styles.content}
        style={bgStyle}
        onClick={handleClick}
      >
        <div className={styles.progressWrapper}>
          {story?.slides.map((_, i) => (
            <div key={`progress-${i}`} className={styles.progressBar}>
              <div
                className={clsx(
                  index == i && styles.meter,
                  index >= i && styles.visited,
                  !overflowHidden && styles.paused
                )}
                onAnimationEnd={toNext}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.navWrapper}>
          <img
            src={closeIcon}
            width="18px"
            height="18px"
            style={{ filter: "invert(100%)" }}
            alt=""
            role="button"
            onClick={closeModal}
          />
          <img
            src={sendIcon}
            width="24px"
            height="24px"
            alt=""
            role="button"
            onClick={copyShareLink}
          />
        </div>
        <div className={styles.slideDetail}>
          <h2 className="textTitle textLight">
            {story?.slides[index].heading}
          </h2>
          <div className={clsx(styles.description, "textLight")}>
            <p className={clsx(overflowHidden && styles.hideOverflow)}>
              {story?.slides[index].description}
            </p>
            {isOverflowing && overflowHidden && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOverflowHidden(false);
                }}
              >
                more
              </span>
            )}
            {isOverflowing && !overflowHidden && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOverflowHidden(true);
                }}
              >
                less
              </span>
            )}
          </div>
        </div>
        <div className={styles.storyAction}>
          <Bookmark
            fillColor={bookmarked ? "blue" : "white"}
            handleClick={(e) => {
              e.stopPropagation();
              bookmarkStory();
            }}
          />
          <div className={styles.likeDiv}>
            <Like
              fillColor={liked ? "red" : "white"}
              handleClick={(e) => {
                e.stopPropagation();
                likeStory();
              }}
            />
            <span>{story?.likes.length}</span>
          </div>
        </div>
      </div>
      <img
        className={styles.navBtn}
        src={nextIcon}
        alt=""
        role="button"
        onClick={toNext}
      />
    </article>
  );
};
export default StoryModal;
