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
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";


interface MenuDeleteItemProps {
    chatId: string;
    onDelete?: (chatId: string) => void;
}

const MenuDeleteItem = (props: MenuDeleteItemProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className='cursor-pointer'
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2/>
                    <span>删除</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>永久删除对话</DialogTitle>
                </DialogHeader>
                <p>
                    删除后，该对话不可恢复，确认删除吗？
                </p>
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
                        type="submit"
                        variant='destructive'
                        onClick={() => {
                            if (props.onDelete) {
                                props.onDelete(props.chatId);
                            }
                            setIsOpen(false)
                        }
                    }
                    >
                        删除
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MenuDeleteItem;