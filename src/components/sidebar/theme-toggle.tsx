import React from 'react';
import {useTheme} from "next-themes";
import { Moon, Sun} from "lucide-react";
import {SidebarMenuButton} from "@/components/ui/sidebar";


/**
 * 主题切换
 */
const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <SidebarMenuButton
                className='w-8 cursor-pointer'
                onClick={() => setTheme(theme === 'light' ?  'dark' : 'light')}
            >
                {/**
                 * 渲染一个太阳图标，并根据当前主题（亮色/暗色）应用不同的样式。
                 *
                 * 该组件使用了 Tailwind CSS 类名来控制图标的尺寸、旋转和缩放效果。
                 * 在亮色主题下，图标保持默认状态；在暗色主题下，图标会旋转并缩小至不可见。
                 */}
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                {/**
                 * 渲染一个月亮图标，用于表示暗黑模式或夜间主题。
                 * 该图标在暗黑模式下会旋转并放大，而在普通模式下会旋转并缩小。
                 *
                 * 图标使用了Tailwind CSS类名来控制样式和动画效果：
                 * - `absolute`: 使图标绝对定位。
                 * - `h-[1.2rem] w-[1.2rem]`: 设置图标的高度和宽度为1.2rem。
                 * - `rotate-90`: 在普通模式下将图标旋转90度。
                 * - `scale-0`: 在普通模式下将图标缩小到不可见。
                 * - `transition-all`: 应用所有属性的过渡效果。
                 * - `dark:rotate-0`: 在暗黑模式下将图标旋转回0度。
                 * - `dark:scale-100`: 在暗黑模式下将图标放大到正常大小。
                 */}
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </SidebarMenuButton>
        </>
    );
};

export default ThemeToggle;