export const CustomEventProp = event => {
   let backgroundColor = ''

   switch (event.data.responsable) {
      case 'Santiago':
         backgroundColor = '#27895E'
         break
      case 'Stephany':
         backgroundColor = '#898027'
         break
      default:
         backgroundColor = '#909087'
   }
   return { style: { backgroundColor } }
}
