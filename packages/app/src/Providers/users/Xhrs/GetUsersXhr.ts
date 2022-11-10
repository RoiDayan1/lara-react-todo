import BaseXhr, { XhrMethod, XhrResponse } from '../../../Services/XhrService';
import { User } from '@roid/models/src/users.model';
import { plainToInstance } from 'class-transformer';

interface Args {
    search?: string;
}

class GetUsersXhr extends BaseXhr<User[]> {
    endpoint = '/users';
    method = XhrMethod.GET;

    request(args: Args) {
        this.query = {
            search: args?.search || '',
        };
        return this.call();
    }

    responseTransform(response: XhrResponse) {
        return response.data?.map((i: any) => plainToInstance(User, i)) || [];
    }
}

export default new GetUsersXhr();
