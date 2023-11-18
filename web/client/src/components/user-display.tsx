import { numberDisplay } from "@/lib/constants"
import { User, UserDashboardProfile } from "@/lib/types"

interface UserDisplayProps {
  user: User
}

export default function UserDisplay({ user }: UserDisplayProps) {
  return user ? (
    <>
      <p className="text-center mb-2 border-b-2 border-foreground text-lg px-2 py-2">
        Attendee Details
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Name: <span className="font-bold">{user.name}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Email: <span className="font-bold">{user.email}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Phone: <span className="font-bold">{user.phone}</span>
      </p>
      <p className="py-1 border-b border-b-foreground/10">
        Gender:{" "}
        <span className="font-bold">
          {user.gender[0].toUpperCase() + user.gender.slice(1)}
        </span>
      </p>
      {user.role.role === "student" ? (
        <>
          <p className="py-1 border-b border-b-foreground/10">
            College: <span className="font-bold">{user.role.college}</span>
          </p>
          <p className="py-1 border-b border-b-foreground/10">
            Course: <span className="font-bold">{user.role.course}</span>
          </p>
          <p className="py-1 border-b border-b-foreground/10">
            Branch: <span className="font-bold">{user.role.branch}</span>
          </p>
          <p className="py-1">
            Year of Study:{" "}
            <span className="font-bold">
              {numberDisplay[Number(user.role.yearOfStudy) - 1]} year
            </span>
          </p>
        </>
      ) : user.role.role === "employee" ? (
        <>
          <p className="py-1 border-b border-b-foreground/10">
            Company: <span className="font-bold">{user.role.company}</span>
          </p>
          <p className="py-1">
            Designation:{" "}
            <span className="font-bold">{user.role.designation}</span>
          </p>
        </>
      ) : (
        <p className="text-center text-red-500">Please select a role</p>
      )}
    </>
  ) : (
    <p className="text-red-500 text-center">
      Unable to fetch User Profile. Please try again later
    </p>
  )
}
