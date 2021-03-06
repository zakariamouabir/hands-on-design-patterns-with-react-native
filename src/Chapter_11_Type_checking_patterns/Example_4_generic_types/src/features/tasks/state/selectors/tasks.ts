import { createSelector } from 'reselect';
import Maybe, { MaybeType } from '../../../../common/utils/Maybe';
import { TasksReducerState } from '../types';
import { State } from '../../../../flux/types';

export const tasksSelector =
    (state: State):MaybeType<TasksReducerState> =>
        (Maybe<State>(state)).map((x:State) => x.tasks);

export const tasksEntitiesSelector = createSelector(
    tasksSelector,
    maybeTasks => maybeTasks.map((tasks: TasksReducerState) => tasks.get('entities'))
);

export const tasksIsLoadingSelector = createSelector(
    tasksSelector,
    maybeTasks => maybeTasks.map(tasks => tasks.get('isLoading'))
);

export const tasksHasErrorSelector = createSelector(
    tasksSelector,
    maybeTasks => maybeTasks.map(tasks => tasks.get('hasError'))
);

export const tasksErrorMsgSelector = createSelector(
    tasksSelector,
    maybeTasks => maybeTasks.map(tasks => tasks.get('errorMsg'))
);

export const getTaskById = (taskId: number) => createSelector(
    tasksEntitiesSelector,
    (entities: any) => entities.map((e: any) => e.find((task: any) => task.id === taskId))
);
