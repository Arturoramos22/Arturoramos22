#!/usr/bin/env bash
# Vuelve a descargar los PDF de las capturas y compara su SHA-256 con el registrado el 31-oct/1-nov-2026.
# Uso: bash scripts/descargar_fuentes.sh [carpeta_destino]
set -u
DEST="${1:-fuentes-pdf}"; mkdir -p "$DEST"; i=0
while read -r h u; do i=$((i+1)); f="$DEST/$(printf %02d $i).pdf"
  if curl -sSL --max-time 120 -o "$f" "$u"; then g=$(sha256sum "$f" | cut -c1-64); if [ "$g" = "$h" ]; then echo "OK      $u"; else echo "CAMBIÓ  $u (nuevo: $g)"; fi; else echo "ERROR   $u"; fi
done <<'LISTA'
e87bdb236ad930d2867579f261c6305ae7ab304bd1ea90760d059671ffa1860e https://www.cens.com.co/Portals/cens/clientes-y-usuarios/Tarifas-de-energia/T2026/Tarifas_CENS_202610_.pdf
4959ed3349650aeb174c165ce80bc91721eb08f8e62f0719ecf08921d6ea3920 https://www.cens.com.co/Portals/cens/clientes-y-usuarios/Tarifas-de-energia/T2025/Tarifa_CENS_202510.pdf
454cc653a63752840e1050f735d5c2bcb740ec3ec560291d9487d8a3a01d276c https://www.dane.gov.co/files/operaciones/IPC/sep2026/bol-IPC-sep2026.pdf
7dc78e91225d794d1d3af4818c916feba0ecd3117bf066f7b3b9af918c65660b https://www.cens.com.co/Portals/cens/institucional/informes-de-sostenibilidad/2025/Informe%20ejecutivo%20de%20Sostenibilidad%20CENS%202025.pdf
40f283fb4cfd1d28d50e5673b6881f716ab9aec03c30701bebed9c1096759548 https://www.cens.com.co/Portals/cens/institucional/informes-de-sostenibilidad/2025/Informe%20de%20Sostenibilidad%20CENS%202025_full%20versi%C3%B3n.pdf
091940f93c20f2257097a3634a8250e59e3996f827b890a60b7fb3e2ced08339 https://www.cens.com.co/Portals/cens/institucional/informes-de-sostenibilidad/2025/Anexo6_Notas_Estados_Financieros2025.pdf
4767776d5a9af0263438a88ebcfcdb47e9691c653bee948f136d90c4dff5a3a6 https://www.cens.com.co/Portals/cens/Accionistas/Informes-financieros-y-contables-trimestrales/2026/NOTAS%20A%20LOS%20EEFF%20PRIMER%20TRIM2026.pdf
2b59c130104021983faf71e56e06442f3a66be5fbec40f3bf35ee40e4275e636 https://www.cens.com.co/Portals/cens/institucional/informes-de-sostenibilidad/informe-de-sostenibilidad-cens-2020.pdf
875fa4d990edc1d53a65757bad1ab16daafc5e7400c2195b90e664a55a5fafa1 https://www.cens.com.co/Portals/cens/Accionistas/Informes-financieros-y-contables-trimestrales/2026/ERI_Segundo_Trimestre_2026.pdf
d01d8df869376fb6bf74f7d3433ada66b823cc6846f912e02c957ac106740402 https://gestornormativo.creg.gov.co/Publicac.nsf/1c09d18d2d5ffb5b05256eee00709c02/b8273859c250da83052587b2005f783a/$FILE/Creg215-2021.pdf
96257aad68c9a00d31fb6e7d919293ba5e04c6238310fde2a7bbadb50cf96664 https://www.superservicios.gov.co/sites/default/files/inline-files/Boletin-tarifario-de-energia-II-trimestre-de-2025.pdf
8ea15d2e4c03dc7179964d8b8bcd208c2427ebc86a97a7f87283f7347dce462f https://www.minenergia.gov.co/documents/11070/Expost_ADD_2023_compressed.pdf
67b629ddc867c2e0779c63a2e6f1f5718ecf11113c2bfeb75c1288283bcf08a1 https://gestornormativo.creg.gov.co/Publicac.nsf/52188526a7290f8505256eee0072eba7/9d94ddc5ae8a7306052588d90052e4da/$FILE/Circular095-2022.pdf
5d8e9af28dd18b0ef4ffcfce2ee158285f4125c61be1a651302545961f833520 https://www.superservicios.gov.co/sites/default/files/2025-09/Indicadores-de-gestion-energia-electrica-ano-2024-v3.pdf
77a72999582d8e488fa9d1cfe04670cfb44770bd79f42bfb4d29ac297b5b7cec https://www.superservicios.gov.co/sites/default/files/inline-files/Informe-de-inspeccion-especial-CENS-2022.pdf
408e40abb247f0a5535bc54f02e2626e1aba689b00ff1d191ca5b670736b913a https://www.cens.com.co/Portals/cens/clientes-y-usuarios/Servicio-tecnico/contrato-de-condiciones-uniformes/CCU%20vigente%20desde%20el%2002_10_2023.pdf
54878916873e98e5b6f03edd3d9745eac0712382a34055a8fd67b65f591319ad https://www.cens.com.co/Portals/cens/clientes-y-usuarios/Servicio-tecnico/contrato-de-condiciones-uniformes/CCU_201_ACL_001.pdf?ver=a9ABDLSJbJymr79L3fPFaw%3d%3d
LISTA
