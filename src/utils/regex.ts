/* eslint-disable no-useless-escape */

// export const IsStringRegex = new RegExp(
//   '^[A-Z][a-zñÁÉÍÓÚáéíóúüÜ]+(\\s[A-Z][a-zñÁÉÍÓÚáéíóúüÜ]+)*$',
// );
export const IsEmailRegex = new RegExp(
  '^\[a\-z0\-9\.\!\#</span>%&*+/=?^_`{|}~-]+@[a-z0-9-]+\.[a-z0-9.]{2,}$',
);
export const IsPassword = new RegExp(
  '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$',
);
export const IsDateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
export const IsLevelRegex = new RegExp('^[0-5]$');
export const IsZoneRegex = new RegExp('^(N|S)$');
export const IsHourRegex = new RegExp('^([01]\\d|2[0-3]):[0-5]\\d$');
export const IsPhoneRegex = new RegExp('^\\+?[0-9]{1,3}[-\\s\\.]?[0-9]{6,}$');
export const IsBloodRegex = new RegExp('^(A|B|AB|O)+[+|-]$');
export const IsSexRegex = new RegExp('^(M|F)$');
export const IsDocumentTypeRegex = new RegExp(
  '^(CC|CE|PA|SC|CD|TE|PEP|AS|DU|CCEX|CEEX|PAEX|SCEX|CDEX|TEX|RNEX|PEPEX|ASEX)$',
);
export const IsNameRegex = new RegExp('^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\\s]{3,60}$');
// --ESTADO DE RESERVA: Pendiente(no pago `N`), Confirmada(pago 50% `C`), Pagada(pago completo `P`), Modificada (M), Cancelada(No pago, no va `R`), En ejecución y Finalizada
export const IsReservationStatusRegex = new RegExp('^(N|C|P|M|R|E|F)$');
// -- ESTADOS DE PAGO: REVISAR, PAGO, NO PAGO, ANULADO
export const IsPaymentStatusRegex = new RegExp('^(R|P|N|A|)$');
export const IsImageRegex = new RegExp(/\.(jpg|jpeg|png)$/i);
