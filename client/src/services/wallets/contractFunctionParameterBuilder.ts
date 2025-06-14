import { ContractFunctionParameters } from "@hashgraph/sdk";

export interface ContractFunctionParameterBuilderParam {
  type: string;
  name: string;
  value: any;
}

export class ContractFunctionParameterBuilder {
  private params: ContractFunctionParameterBuilderParam[] = [];

  // Add a parameter to the builder
  public addParam(param: ContractFunctionParameterBuilderParam): ContractFunctionParameterBuilder {
    this.params.push(param);
    return this;
  }

  // Build ABI function parameters for ethers.Contract ABI
  public buildAbiFunctionParams(): string {
    return this.params.map(param => {
      return param.type.endsWith("[]") ? `${param.type} ${param.name}` : `${param.type} ${param.name}`;
    }).join(", ");
  }

  // Build ethers compatible function parameters
  public buildEthersParams(): any[] {
    return this.params.map(param => {
      if (Array.isArray(param.value)) {
        return param.value; // Keep arrays as is
      } else {
        return param.value.toString();
      }
    });
  }

  // Build Hedera compatible function parameters
  public buildHAPIParams(): ContractFunctionParameters {
    const contractFunctionParams = new ContractFunctionParameters();

    for (const param of this.params) {
      // Ensure type is valid
      const alphanumericIdentifier: RegExp = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (!param.type.match(alphanumericIdentifier)) {
        throw new Error(
          `Invalid type: ${param.type}. Type must only contain alphanumeric characters.`
        );
      }

      // Build function name for HAPI
      const type = param.type.charAt(0).toUpperCase() + param.type.slice(1);
      const functionName = `add${type.replace("[]", "")}`; // Remove [] for arrays

      // Handle arrays
      if (Array.isArray(param.value)) {
        if (functionName in contractFunctionParams) {
          for (const item of param.value) {
            (contractFunctionParams as any)[functionName](item);
          }
        } else {
          throw new Error(
            `Invalid type: ${param.type}. Could not find function ${functionName} in ContractFunctionParameters class.`
          );
        }
      } else {
        // Handle single values
        if (functionName in contractFunctionParams) {
          (contractFunctionParams as any)[functionName](param.value);
        } else {
          throw new Error(
            `Invalid type: ${param.type}. Could not find function ${functionName} in ContractFunctionParameters class.`
          );
        }
      }
    }

    return contractFunctionParams;
  }
}
