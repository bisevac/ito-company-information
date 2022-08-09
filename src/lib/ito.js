import CryptoJS from 'crypto-js';
import req from './req.js';


export default class ITO {
  constructor () {
    this.encryptKey = 'WnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/';

    this.detailUrl = 'https://bilgibankasi.ito.org.tr/tr/api/company-detail';
    this.newsPapersUrl = 'https://bilgibankasi.ito.org.tr/tr/api/company-newspaper-informations';
    this.branchAddressUrl = 'https://bilgibankasi.ito.org.tr/tr/api/company-branch-address';
    this.officialsUrl = 'https://bilgibankasi.ito.org.tr/tr/api/company-officials';
    this.oldOfficialsUrl = 'https://bilgibankasi.ito.org.tr/tr/api/old-company-officials';
    this.documentsTypeUrl = 'https://bilgibankasi.ito.org.tr/tr/api/standart-documents-documents-type';
    this.partnersUrl = 'https://bilgibankasi.ito.org.tr/tr/api/partners';
    this.oldPartnersUrl = 'https://bilgibankasi.ito.org.tr/tr/api/old-partners';
    this.boardOfDirectorsUrl = 'https://bilgibankasi.ito.org.tr/tr/api/board-of-director';
    this.oldBoardOfDirectorsUrl = 'https://bilgibankasi.ito.org.tr/tr/api/board-of-director';
  }

  /**
   * @desc Get Company all information. (Detail,newspaper information,branch Address,officials,partners..)
   * @param {String} sicNumber - example "123456-5"
   * @returns {Object}
   */
  async getCompanyWithSicNumber ( sicNumber ) {
    console.info( `Fetching ${sicNumber}..` );
    const sicNumbers = sicNumber.split( '-' );
    const [sicNo, muker] = sicNumbers;

    const company = await this.getCompanyDetail( sicNo, muker );

    company.newspaperInformations = await this.getCompanyInformationWithUrl( sicNo, muker, this.newsPapersUrl );
    company.branchAddress = await this.getCompanyInformationWithUrl( sicNo, muker, this.branchAddressUrl );
    company.officials = await this.getCompanyInformationWithUrl( sicNo, muker, this.officialsUrl );
    company.oldOfficials = await this.getCompanyInformationWithUrl( sicNo, muker, this.oldOfficialsUrl );
    company.documentsType = await this.getCompanyInformationWithUrl( sicNo, muker, this.documentsTypeUrl );
    company.partners = await this.getCompanyInformationWithUrl( sicNo, muker, this.partnersUrl );
    company.oldPartners = await this.getCompanyInformationWithUrl( sicNo, muker, this.oldPartnersUrl );
    company.boardOfDirectors = await this.getCompanyInformationWithUrl( sicNo, muker, this.boardOfDirectorsUrl );
    company.oldBoardOfDirectors = await this.getCompanyInformationWithUrl( sicNo, muker, this.oldBoardOfDirectorsUrl );

    return company;
  }

  /**
   * @desc Company Other Information, max 50 item
   * @param {String} sicNo
   * @param {String} muker
   * @returns {Array}
   */
  async getCompanyInformationWithUrl ( sicNo, muker, url ) {
    try {
      const requestText = `"SICNO=${sicNo}&MUKER=${muker}&PageIndex=1&PageSize=50&hiMami=true"`;
      const body = this.createEncryptedBody( requestText );

      const response = await req( url, 'POST', body );
      const data = response.Data;

      if ( !data ) return null;

      return data;
    } catch ( error ) {
      console.error( error );
      return null;
    }
  }


  /**
   * @param {String} sicNo
   * @param {String} muker
   * @return {{
   *    SicNumber:String,
   *    ChamberOfCommerce:String,
   *    CompanyTitle:String,
   *    FormerTitleOfFirm:Array,
   *    OfficeAddress:String,
   *    PhoneNumber:String,
   *    FaxNumber:String,
   *    WebPageLink:String,
   *    ChamberOfCommerceRegHistory:String
   *    DateOfEstablishmentReg:String
   *    Capital:String
   *    ProfessionalGroup:String
   *    NaceCodes:String
   *    BusinessIssueOfTheFirm:String
   *    TaxNumber:String
   *    CapMersisNoital:String
   *    Nevi:String
   * }}
   */
  async getCompanyDetail ( sicNo, muker ) {
    const requestText = `"SICNO=${sicNo}&MUKER=${muker}&hiMami=true"`;
    const body = this.createEncryptedBody( requestText );

    const response = await req( this.detailUrl, 'POST', body );
    const data = response.Data;

    if ( !data ) return null;

    return data;
  }


  /**
   * @param {String} reqText
   * @returns {String}
   */
  createEncryptedBody ( reqText ) {
    const ciphertext = CryptoJS.AES.encrypt( reqText, this.encryptKey ).toString();
    const utf8Text = CryptoJS.enc.Utf8.parse( ciphertext );
    const encyptedText = CryptoJS.enc.Base64.stringify( utf8Text );
    const body = `params=${encyptedText}`;

    return body;
  }
}
