import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // نبدأ بـ false دائماً لتفادي مشاكل الـ Hydration Mismatch مع الـ SSR
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    mql.addEventListener("change", onChange)
    
    // تحديث الحالة بشكل غير متزامن فوراً بعد الريندر الأول 
    // هذا يحمي من خطأ الـ ESLint ويضمن عمل نسخة الهاتف عند أول تحميل
    queueMicrotask(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    })
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}