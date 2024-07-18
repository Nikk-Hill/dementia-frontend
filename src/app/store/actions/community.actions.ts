import { createAction, props } from "@ngrx/store";
import { Post } from "../../services/post.service";


export const getCommunityStartedAction = createAction(
  '[Fetch Post] Started'
);

export const getCommunityFinishedAction = createAction(
  '[Fetch Post] finished',
  props<{ posts : Post[] }>()
);

export const getCommunityFailedAction = createAction(
  '[Fetch Post] failed'
);