// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectTrainerError, selectUsername } from '../redux/slices/trainerSlice'
import { selectApriError } from '../redux/slices/aprimonSlice'

export default function Error() {

    const trainerError = useAppSelector(selectTrainerError)
    const apriError = useAppSelector(selectApriError)
    let error: string[] = []

    if (trainerError) { error.push(trainerError) }
    if (apriError) { error.push(apriError) }

    if (apriError?.includes("400") || trainerError?.includes("400")) {
        error.push("Your request could not be completed. Please try again. ")
    }
    if (apriError?.includes("401") || trainerError?.includes("401")) {
        error.push("That action is not allowed. You may not be signed in, or you may not be looking at your own profile. ")
    }
    if (apriError?.includes("404") || trainerError?.includes("404")) {
        error.push("The page you were looking for could not be found. ")
    }
    if (apriError?.includes("422") || trainerError?.includes("422")) {
        error.push("Your request could not be completed. Please try again. ")
    }
    if (apriError?.includes("500") || trainerError?.includes("500")) {
        error.push("The server is experiencing a problem. Please come back later. ")
    }

    return error.length > 0 && <div className="box error" style={{ whiteSpace: "pre-wrap" }} >{ error.join("\n\n") }</div>
}