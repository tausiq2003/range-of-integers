"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleForm, State } from "./lib/actions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormState } from "react-dom";

export default function Home() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState(handleForm, initialState);
    return (
        <div className="max-w-2xl mt-20 m-auto max-md:scale-75">
            <div>
                <h1 className="text-3xl font-semibold mb-8">
                    Check the range of inputted integers,
                    <br />
                    in different programming languages
                </h1>
                <p className="text-xl font-medium ml-3">
                    This is a webpage that lets you to check how range of
                    inputted integer is in different programming languages.
                </p>
            </div>
            <form
                action={formAction}
                className="flex flex-wrap gap-5 scale-105 justify-center mt-[50%]"
            >
                <div className="flex">
                    <Input
                        name="integer"
                        type="text"
                        placeholder="Enter your integer"
                        className="rounded-e-none"
                        required
                    />
                    <Select name="language">
                        <SelectTrigger className="w-[140px] rounded-s-none">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Languages</SelectLabel>
                                <SelectItem value="c">C</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                                <SelectItem value="golang">Go</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="javascript">
                                    Javascript
                                </SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="lua">Lua</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Submit</Button>
                {state.errors?.integer && (
                    <div className="text-red-500">{state.errors.integer}</div>
                )}
                {state.errors?.language && (
                    <div className="text-red-500">{state.errors.language}</div>
                )}
                {state.message && (
                    <div className="text-green-500">{state.message}</div>
                )}
            </form>
        </div>
    );
}
