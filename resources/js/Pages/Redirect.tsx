type RedirectProps = {
  redirectTo: string
}

export default function Redirect({redirectTo}: RedirectProps) {
  alert('ページを再読み込みします')
  window.location.replace(redirectTo)
}
