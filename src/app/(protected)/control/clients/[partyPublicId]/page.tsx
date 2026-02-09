'use client';

import { getClientByPartyPublicId } from '@/actions/party/clients/party-client-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { clientStatusLabelMap, clientStatusStylesMap } from '@/utils/maps';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BadgeDollarSignIcon, BoxIcon, FolderArchiveIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AddProject } from '../../components/add-project';
import { ProjectCard } from './components/project-card';

const ClientDetailsPage = () => {
    const queryClient = useQueryClient();

    const { partyPublicId } = useParams() as { partyPublicId: string };

    const { data: party, isLoading: partyIsLoading } = useQuery({
        queryKey: ['clients', partyPublicId],
        queryFn: async () => {
            return await getClientByPartyPublicId(partyPublicId);
        }
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const [tabValue, setTabValue] = useState('projects');

    useEffect(() => {
        const tab = searchParams.get('tab');

        if (!tab) {
            handleSetTab('projects');
        }
    }, []);

    function handleSetTab(tab: string) {
        params.set('tab', tab);
        router.push(`?${params.toString()}`);
        setTabValue(tab);
    }

    return (
        <>
            <header className="w-full flex justify-between">
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="flex gap-4 items-center">
                        {party ? (
                            <>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'capitalize font-medium h-6 gap-1.5 rounded-sm px-2 py-1',
                                        clientStatusStylesMap[party.partyTypes[0].status].badge
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'size-1 rounded-full shrink-0',
                                            clientStatusStylesMap[party.partyTypes[0].status].dot
                                        )}
                                    />
                                    {clientStatusLabelMap[party.partyTypes[0].status]}
                                </Badge>

                                <h2 className="text-lg">{party.fullName}</h2>
                            </>
                        ) : (
                            partyIsLoading && (
                                <>
                                    <Skeleton className="h-6 w-14 rounded-sm" />
                                    <Skeleton className="h-6 w-40 rounded-full" />
                                </>
                            )
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {party ? (
                            <Badge variant="secondary" className="h-fit">
                                Cadastrado {format(party.partyTypes[0].createdAt, 'dd/MM/yyyy HH:mm')}
                            </Badge>
                        ) : (
                            partyIsLoading && <Skeleton className="h-6 w-44 rounded-full" />
                        )}

                        <Button size="icon-sm" variant="ghost">
                            <MoreHorizontalIcon />
                        </Button>
                    </div>
                </div>
            </header>

            {party ? (
                <Tabs defaultValue="projects" value={tabValue}>
                    <TabsList className="bg-transparent p-0 gap-1">
                        <TabsTrigger value="projects" onClick={() => handleSetTab('projects')}>
                            <BoxIcon />
                            Projetos
                            <Badge className="py-0">0</Badge>
                        </TabsTrigger>

                        <TabsTrigger value="sales" onClick={e => handleSetTab('sales')}>
                            <BadgeDollarSignIcon />
                            Vendas
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-4">
                        <TabsContent value="projects">
                            {party.projects ? (
                                <main>
                                    <header className="flex justify-between mb-6">
                                        <Input placeholder="Pesquisar projeto..." className="w-full max-w-xs" />

                                        <AddProject partyPublicId={party.publicId}>
                                            <Button className="rounded-sm" variant="outline">
                                                <PlusIcon />
                                                Novo projeto
                                            </Button>
                                        </AddProject>
                                    </header>

                                    {party.projects.length > 0 ? (
                                        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {party.projects.map(project => (
                                                <ProjectCard key={project.publicId} project={project} />
                                            ))}
                                        </main>
                                    ) : (
                                        <Empty>
                                            <EmptyHeader>
                                                <EmptyMedia variant="icon">
                                                    <FolderArchiveIcon />
                                                </EmptyMedia>
                                                <EmptyTitle>Sem Projetos Aqui</EmptyTitle>
                                                <EmptyDescription>
                                                    Você ainda não criou nenhum projeto. Comece criando seu primeiro
                                                    projeto.
                                                </EmptyDescription>
                                            </EmptyHeader>
                                            <EmptyContent className="flex-row justify-center gap-2">
                                                <AddProject partyPublicId={party.publicId}>
                                                    <Button variant="outline">Novo projeto</Button>
                                                </AddProject>
                                            </EmptyContent>
                                        </Empty>
                                    )}
                                </main>
                            ) : (
                                partyIsLoading && <Skeleton className="h-6 w-44 rounded-full" />
                            )}
                        </TabsContent>

                        <TabsContent value="sales">
                            <p>Vendas</p>
                        </TabsContent>
                    </div>
                </Tabs>
            ) : (
                partyIsLoading && <Skeleton className="h-6 w-44 rounded-full" />
            )}
        </>
    );
};

export default ClientDetailsPage;
