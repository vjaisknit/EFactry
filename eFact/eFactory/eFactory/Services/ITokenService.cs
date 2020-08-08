﻿using eFactory.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eFactory.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
