import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Edit} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


interface MenuDeleteItemProps {
    chatId: string;
    chatName: string;
    onEdit?: (chatId: string, chatName: string) => void;
}

const MenuEditItem = (props: MenuDeleteItemProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    let newValue = '';

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className='cursor-pointer'
                    onSelect={(e) => e.preventDefault()}
                >
                    <Edit/>
                    <span>编辑</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>重命名会话</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        id="chatName"
                        className="col-span-3"
                        defaultValue={props.chatName}
                        onChange={(e) => {
                            newValue = e.target.value;
                        }}
                         />
                </div>
                <DialogFooter>
                    <Button
                        className='cursor-pointer'
                        variant='outline'
                        onClick={() => setIsOpen(false)}
                    >
                        取消
                    </Button>
                    <Button
                        className='cursor-pointer'
                        onClick={() => {
                            if (props.onEdit) props.onEdit(props.chatId, newValue);
                            setIsOpen(false);
                        }}
                    >
                        确定
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MenuEditItem;