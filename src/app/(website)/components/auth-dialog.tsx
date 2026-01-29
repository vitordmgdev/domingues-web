"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/utils/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

export const AuthDialog = ({ children }: { children: React.ReactNode }) => {
    async function handleGoogleLogin() {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Autenticação</DialogTitle>
                    <DialogDescription>
                        Entre com sua conta ou crie uma nova para continuar.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="sign-in">
                    <TabsList className="w-full bg-background p-0">
                        <TabsTrigger value="sign-in">Entrar</TabsTrigger>

                        <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sign-in">
                        <SignInForm />
                    </TabsContent>

                    <TabsContent value="sign-up">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>

                <Separator />

                <Button variant="outline" onClick={handleGoogleLogin}>
                    <FcGoogle className="size-4" />
                    Continuar com Google
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const signInSchema = z.object({
    email: z.email("Insira um e-mail válido."),
    password: z
        .string()
        .min(8, "Insira uma senha com pelo menos 8 caracteres.")
        .max(32, "Insira uma senha com no máximo 32 caracteres."),
    rememberMe: z.boolean().default(false),
});

const signUpSchema = z.object({
    name: z.string().min(3, "Insira um nome com pelo menos 3 caracteres."),
    email: z.email("Insira um e-mail válido."),
    password: z
        .string()
        .min(8, "Insira uma senha com pelo menos 8 caracteres."),
});

export const SignInForm = () => {
    async function onSubmit(values: z.infer<typeof signInSchema>) {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
            callbackURL: "/",
        });
    }

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <div className="flex flex-col gap-4 my-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="exemplo@email.com"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Insira a sua senha"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>

                                <FormLabel>Lembrar de mim</FormLabel>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    variant="brand"
                >
                    Entrar na conta
                </Button>

                <Button variant="link" className="w-full mt-2">
                    Esqueceu a sua senha?
                </Button>
            </form>
        </Form>
    );
};

export const SignUpForm = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.name,
            callbackURL: "/",
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 my-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Insira o seu nome"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="exemplo@email.com"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Insira a sua senha"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    variant="brand"
                >
                    Criar conta
                </Button>
            </form>
        </Form>
    );
};
