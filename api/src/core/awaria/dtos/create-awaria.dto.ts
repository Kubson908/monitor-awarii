export class CreateAwariaDto {
  opis_awarii: string;
  status: 'Oczekująca' | 'Podjęta' | 'Ukończona';
  priorytet: 'Wysoki' | 'Niski' | 'Średni';
  pracownik: number;
  stanowisko: number;
}
