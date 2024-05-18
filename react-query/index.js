import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDiary, addDiary,deleteDiary,editDiary } from "../api/firebase";
import { addTag,getColorTags,getCustomTags,deleteColorTag,deleteCustomTag } from "../api/firebase";
import { useDispatch } from "react-redux";
import { setIsPending } from "../src/redux/uploadDiarySlice";

export const useGetDiary = () => {
    const query = useQuery({
        queryKey:['Diary'],
        queryFn:getDiary,
    })
    return query;
}

export const useAddDiary = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn:addDiary,
        onSuccess:() => {
            dispatch(setIsPending());
            queryClient.invalidateQueries({ queryKey: ['Diary'] });
        },
        mutationKey: ['addDiary'],
    });

    return mutation;
}

export const useDeleteDiary = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:deleteDiary,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ['Diary'] });
        },
        mutationKey: ['deleteDiary'],
    });

    return mutation;
}

export const useEditDiary = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:editDiary,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['Diary']});
        },
        mutationKey:['editDiary'],
    });

    return mutation;
}

export const useGetColorTags = () =>{
    const query = useQuery({
        queryKey:['ColorTags'],
        queryFn:getColorTags,
    })
    return query;
}

export const useGetCustomTags = () =>{
    const query = useQuery({
        queryKey:['CustomTags'],
        queryFn:getCustomTags,
    })
    return query;
}

export const useAddTag = () =>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:addTag,
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['ColorTags']});
            queryClient.invalidateQueries({queryKey:['CustomTags']});
        },
        mutationKey:['addTag'],
    });

    return mutation;
}

export const useDeleteColorTag = () =>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:deleteColorTag,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ['ColorTags'] });
        },
        mutationKey: ['deleteColorTag'],
    });

    return mutation;
}

export const useDeleteCustomTag = () =>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:deleteCustomTag,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ['CustomTags'] });
        },
        mutationKey: ['deleteCustomTag'],
    });

    return mutation;
}