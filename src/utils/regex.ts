/* eslint-disable no-useless-escape */

export const IsStringRegex = new RegExp(
  '^[A-Z][a-zñÁÉÍÓÚáéíóúüÜ]{3,}[^\\d\\W_]*(\\s[A-Za-zñÁÉÍÓÚáéíóúüÜ][a-zñÁÉÍÓÚáéíóúüÜ]{2,}[^\\d\\W_]*)*$',
);
export const IsEmailRegex = new RegExp(
  '^\[a\-z0\-9\.\!\#</span>%&*+/=?^_`{|}~-]+@[a-z0-9-]+\.[a-z0-9.]{2,}$',
);
export const IsPassword = new RegExp(
  '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$',
);
export const IsPriceRegex = new RegExp('(\d{1,15})(\.\d{1,2})?$');
export const IsDateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
export const IsZoneRegex = new RegExp('^(N|S)$');
export const IsPhoneRegex = new RegExp('^\\+?[0-9]{1,3}[-\\s\\.]?[0-9]{6,}$');
export const IsBloodRegex = new RegExp('^(A|B|AB|O)+[+|-]$');
export const IsSexRegex = new RegExp('^(M|F)$');
export const IsDocumentTypeRegex = new RegExp(
  '^(CC|CE|PA|SC|CD|TE|PEP|AS|DU|CCEX|CEEX|PAEX|SCEX|CDEX|TEX|RNEX|PEPEX|ASEX)$',
);
// --ESTADO DE RESERVA: Pendiente(no pago `N`), Confirmada(pago 50% `C`), Pagada(pago completo `P`), Modificada (M), Cancelada(No pago, no va `R`), En ejecución y Finalizada
export const IsReservationStatusRegex = new RegExp('^(N|C|P|M|R|E|F)$');
// -- ESTADOS DE PAGO: REVISAR, PAGO, NO PAGO, ANULADO
export const IsPaymentStatusRegex = new RegExp('^(R|P|N|A|)$');
export const ImageExtensionRegex = new RegExp(/\.(png|jpe?g|gif|webp|svg)$/i);
