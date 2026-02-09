'use client';

import { deleteProject } from '@/actions/projects/project-actions';
import { AlertDialogDeleteConfirmation } from '@/components/alert-dialog-delete-confirmation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { projectPriorityMap } from '@/utils/maps';
import { Project } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export const ProjectCard = ({ project }: { project: Project }) => {
    const { label, icon: Icon, style } = projectPriorityMap[project.priority];
    const { partyPublicId } = useParams() as { partyPublicId: string };
    const queryClient = useQueryClient();

    const { mutateAsync: deleteProjectMutation } = useMutation({
        mutationFn: async (projectPrivateId: string) => {
            return await deleteProject(projectPrivateId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clients', partyPublicId]
            });

            toast.success('Projeto deletado com sucesso!');
        },
        onError: () => {
            toast.error('Erro ao deletar projeto!');
        }
    });

    return (
        <div className="border rounded-sm flex flex-col overflow-hidden relative bg-card/50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon-xs" variant="ghost" className="absolute top-2 right-2">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <AlertDialogDeleteConfirmation
                        title="Deletar projeto"
                        description="Tem certeza que deseja deletar este projeto?"
                        onClick={() => deleteProjectMutation(project.privateId)}
                    >
                        <DropdownMenuItem>
                            <Trash2Icon />
                            Deletar
                        </DropdownMenuItem>
                    </AlertDialogDeleteConfirmation>
                </DropdownMenuContent>
            </DropdownMenu>
            <header className="flex flex-col gap-4 p-4">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground font-normal">
                            {format(new Date(project.createdAt), 'dd/MM/yyyy', {
                                locale: ptBR
                            })}
                        </span>

                        <h1 className="text-sm font-normal">{project.title}</h1>
                    </div>

                    <Badge className={`${style.bg} ${style.border} ${style.text} rounded-sm`}>
                        {label}
                        <Icon />
                    </Badge>
                </div>

                <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                        {new Date(project.deadlineDate) < new Date()
                            ? `Atrasado ${formatDistanceToNow(new Date(project.deadlineDate), {
                                  locale: ptBR,
                                  addSuffix: true
                              })}`
                            : `Entregar ${format(new Date(project.deadlineDate), 'dd/MM/yyyy', {
                                  locale: ptBR
                              })}`}
                    </Badge>

                    <div className="flex items-center gap-2">
                        {project.startedAt ? (
                            <Badge variant="default">
                                Iniciado em{' '}
                                {format(new Date(project.startedAt), 'dd/MM/yyyy', {
                                    locale: ptBR
                                })}
                            </Badge>
                        ) : (
                            <Badge variant="destructive">Não Iniciado</Badge>
                        )}

                        {project.finishedAt ? (
                            <Badge variant="default">
                                Finalizado em{' '}
                                {format(new Date(project.finishedAt), 'dd/MM/yyyy', {
                                    locale: ptBR
                                })}
                            </Badge>
                        ) : (
                            <Badge variant="destructive">Não Finalizado</Badge>
                        )}
                    </div>
                </div>
            </header>

            <footer className="flex items-center justify-between gap-2 p-4 border-t">
                <Button variant="ghost" size="sm">
                    Editar
                </Button>
            </footer>
        </div>
    );
};
