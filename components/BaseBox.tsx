import { ReactElement } from "react"

interface BoxProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode; 
}

export default function BaseBox({ children, className, ...props }: BoxProps) {
  return (
    <div className={`py-4 px-5 bg-white border border-gray-300 rounded-sm ${className}`} {...props}>
      {children}
    </div>
  )
}
