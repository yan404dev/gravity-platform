import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/shared/services/auth.service';
import { User } from '@/shared/entities/user.entity';

export const useUser = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, error } = useQuery<User>({
        queryKey: ['me'],
        queryFn: authService.me,
        retry: 0,
        staleTime: 1000 * 60 * 5,
    });

    const invalidateUser = () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
    };

    const setUser = (user: User | null) => {
        queryClient.setQueryData(['me'], user);
    };

    return {
        user,
        isLoading,
        error,
        invalidateUser,
        setUser,
    };
};
