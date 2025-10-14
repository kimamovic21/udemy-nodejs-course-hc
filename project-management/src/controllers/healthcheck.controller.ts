import { asyncHandler } from '../utils/async-handler';
import ApiResponse from '../utils/api-response';

export const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, 'Server is running'));
});  