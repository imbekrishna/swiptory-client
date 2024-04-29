import { useEffect, useReducer, useState } from "react";
import api from "@/api/api_instance";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { ModalContext } from "@/contexts/ModalContext";

const useStory = (storyId) => {
  const { user } = useContext(UserContext);
  const { toggleAuthModal, toggleStoryModal } = useContext(ModalContext);

  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    error: null,
  });

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_STORY": {
          return { story: action.payload.data };
        }
        case "LIKE_STORY": {
          const story = { ...state.story };
          const likesArray = [...story.likes];
          if (likesArray.includes(user.id)) {
            const index = likesArray.findIndex((i) => i === user.id);
            likesArray.splice(index, 1);
          } else {
            likesArray.push(user.id);
          }
          story.likes = likesArray;
          return { story };
        }
        case "BOOKMARK_STORY": {
          const story = { ...state.story };
          const bookmarksArray = [...story.bookmarks];
          if (bookmarksArray.includes(user.id)) {
            const index = bookmarksArray.findIndex((i) => i === user.id);
            bookmarksArray.splice(index, 1);
          } else {
            bookmarksArray.push(user.id);
          }
          story.bookmarks = bookmarksArray;

          return { story };
        }
        default:
          return state;
      }
    },
    {
      story: null,
    }
  );

  useEffect(() => {
    if (!storyId) {
      dispatch({ type: "SET_STORY", payload: { data: null } });
      return;
    }

    api
      .get(`/api/story/${storyId}`)
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: "SET_STORY", payload: { data } });
      })
      .catch((error) => {
        setFetchStatus((prev) => ({ ...prev, error: error }));
        console.log(error);
      })
      .finally(() => {
        setFetchStatus((prev) => ({ ...prev, loading: false }));
      });
  }, [storyId]);

  const liked = state.story?.likes.includes(user?.id);
  const bookmarked = state.story?.bookmarks.includes(user?.id);

  // FIXME: Error handling for like and bookmark!
  const likeStory = async () => {
    try {
      if (!user) {
        toggleStoryModal();
        toggleAuthModal("LOGIN");
        return;
      }
      const res = await api.patch(`/api/story/like/${storyId}`);

      if (res.status === 201) {
        dispatch({ type: "LIKE_STORY" });
      }
    } catch (error) {
      setFetchStatus((prev) => ({ ...prev, error: error }));
    }
  };
  const bookmarkStory = async () => {
    try {
      if (!user) {
        toggleStoryModal();
        toggleAuthModal("LOGIN");
        return;
      }
      const res = await api.patch(`/api/story/bookmark/${storyId}`);

      if (res.status === 201) {
        dispatch({ type: "BOOKMARK_STORY" });
      }
    } catch (error) {
      setFetchStatus((prev) => ({ ...prev, error: error }));
    }
  };

  return {
    fetchStatus,
    likeStory,
    bookmarkStory,
    data: {
      story: state.story,
      liked,
      bookmarked,
    },
  };
};

export default useStory;
