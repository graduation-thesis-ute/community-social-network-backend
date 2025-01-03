/**
 * @swagger
 * components:
 *  schemas:
 *   CreateAccountInput:
 *    type: object
 *    required:
 *     - name
 *     - email
 *     - password
 *     - memberId
 *    properties:
 *     name:
 *      type: string
 *      default: Nguyen Van A
 *     email:
 *      type: string
 *      default: nguyenvana@gmail.com
 *     password:
 *      type: string
 *      default: 123456
 *     memberId:
 *      type: string
 *      default: 21110123
 *
 *   LoginAccountInput:
 *    type: object
 *    required:
 *     - username
 *     - password
 *    properties:
 *     username:
 *      description: Email or Member ID
 *      type: string
 *      default: 21110294
 *     password:
 *      type: string
 *      default: 123456
 *   LoginAccountOutput:
 *    type: object
 *    properties:
 *     accessToken:
 *      type: string
 *      default: abcxyzo
 *     refreshToken:
 *      type: string
 *      default: xyzmnop
 *   RefreshAccessTokenOutput:
 *    type: object
 *    properties:
 *     accessToken:
 *      type: string
 *      default: abcxyzo
 *     refreshToken:
 *      type: string
 *      default: xyzmnop
 */
